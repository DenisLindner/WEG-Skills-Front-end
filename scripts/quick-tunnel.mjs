#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const host = "127.0.0.1";
const port = readPort(process.env.QUICK_TUNNEL_PORT ?? "3000");
const protocol = readOption(
  "QUICK_TUNNEL_PROTOCOL",
  process.env.QUICK_TUNNEL_PROTOCOL ?? "http2",
  ["auto", "http2", "quic"],
);
const requestedRuntime = readOption(
  "QUICK_TUNNEL_RUNTIME",
  process.env.QUICK_TUNNEL_RUNTIME ?? "auto",
  ["auto", "cloudflared", "docker"],
);
const localUrl = `http://${host}:${port}`;
const nextCli = join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const children = new Set();
let stopping = false;

if (!existsSync(nextCli)) {
  fail("As dependencias nao estao instaladas. Execute `npm ci` antes do tunel.");
}

const tunnel = resolveTunnelCommand(requestedRuntime, protocol, localUrl);

console.log("\nWEG Skills - Quick Tunnel");
console.log(`Aplicacao local: ${localUrl}`);
console.log(`Transporte Cloudflare: ${protocol}`);
console.log(`Runtime: ${tunnel.label}`);
console.log("A URL publica sera exibida pelo cloudflared. Use Ctrl+C para encerrar tudo.\n");

const nextProcess = start(
  process.execPath,
  [nextCli, "dev", "--hostname", host, "--port", String(port)],
  {
    ...process.env,
    QUICK_TUNNEL: "true",
  },
);

try {
  await waitUntilAvailable(localUrl, nextProcess);
} catch (error) {
  console.error(`\n${messageFrom(error)}`);
  await stopAll(1);
}

console.log("\nNext.js pronto. Abrindo o Quick Tunnel...\n");
const tunnelProcess = start(tunnel.command, tunnel.args, process.env);

nextProcess.once("exit", (code, signal) => {
  if (!stopping) {
    console.error(`\nO Next.js encerrou (${exitDescription(code, signal)}).`);
    void stopAll(code && code > 0 ? code : 1);
  }
});

tunnelProcess.once("exit", (code, signal) => {
  if (!stopping) {
    console.error(`\nO Quick Tunnel encerrou (${exitDescription(code, signal)}).`);
    void stopAll(code && code > 0 ? code : 1);
  }
});

process.once("SIGINT", () => void stopAll(0));
process.once("SIGTERM", () => void stopAll(0));

function readPort(value) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > 65535) {
    fail("QUICK_TUNNEL_PORT deve ser uma porta entre 1 e 65535.");
  }
  return parsed;
}

function readOption(name, value, allowed) {
  if (!allowed.includes(value)) {
    fail(`${name} deve ser um destes valores: ${allowed.join(", ")}.`);
  }
  return value;
}

function resolveTunnelCommand(runtime, selectedProtocol, originUrl) {
  const cloudflaredBin = process.env.CLOUDFLARED_BIN ?? "cloudflared";
  const cloudflaredAvailable = commandWorks(cloudflaredBin, ["version"]);
  const dockerAvailable =
    process.platform === "linux" &&
    commandWorks("docker", ["info", "--format", "{{.ServerVersion}}"]);

  if (runtime === "cloudflared" || (runtime === "auto" && cloudflaredAvailable)) {
    if (!cloudflaredAvailable) {
      fail(`Nao foi possivel executar ${cloudflaredBin}. Instale o cloudflared ou use QUICK_TUNNEL_RUNTIME=docker.`);
    }
    assertNoLocalCloudflaredConfig();
    return {
      label: "cloudflared local",
      command: cloudflaredBin,
      args: [
        "tunnel",
        "--no-autoupdate",
        "--protocol",
        selectedProtocol,
        "--url",
        originUrl,
      ],
    };
  }

  if (runtime === "docker" || (runtime === "auto" && dockerAvailable)) {
    if (process.platform !== "linux") {
      fail("O fallback Docker usa a rede do host e esta disponivel somente no Linux. Instale o cloudflared localmente.");
    }
    if (!dockerAvailable) {
      fail("O Docker nao esta disponivel ou o daemon nao esta em execucao.");
    }
    return {
      label: "Docker (cloudflare/cloudflared:latest)",
      command: "docker",
      args: [
        "run",
        "--rm",
        "--network",
        "host",
        process.env.CLOUDFLARED_IMAGE ?? "cloudflare/cloudflared:latest",
        "tunnel",
        "--no-autoupdate",
        "--protocol",
        selectedProtocol,
        "--url",
        originUrl,
      ],
    };
  }

  fail("Nenhum runtime disponivel. Instale o cloudflared ou inicie o Docker e tente novamente.");
}

function assertNoLocalCloudflaredConfig() {
  const configDirectory = join(homedir(), ".cloudflared");
  const configFiles = ["config.yml", "config.yaml"]
    .map((name) => join(configDirectory, name))
    .filter(existsSync);

  if (configFiles.length > 0) {
    fail(
      `Quick Tunnels nao aceitam o arquivo ${configFiles[0]}. Renomeie-o temporariamente ou use QUICK_TUNNEL_RUNTIME=docker.`,
    );
  }
}

function commandWorks(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "ignore",
    timeout: 10_000,
  });
  return !result.error && result.status === 0;
}

function start(command, args, env) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    env,
    stdio: "inherit",
  });
  children.add(child);
  child.once("close", () => children.delete(child));
  child.once("error", (error) => {
    if (!stopping) {
      console.error(`\nFalha ao iniciar ${command}: ${error.message}`);
      void stopAll(1);
    }
  });
  return child;
}

async function waitUntilAvailable(url, child) {
  const deadline = Date.now() + 90_000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error("O Next.js encerrou antes de ficar disponivel.");
    }

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
      await response.body?.cancel();
      return;
    } catch {
      await delay(500);
    }
  }

  throw new Error(`O Next.js nao respondeu em ${url} dentro de 90 segundos.`);
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function stopAll(exitCode) {
  if (stopping) return;
  stopping = true;

  const activeChildren = [...children].filter(
    (child) => child.exitCode === null && child.signalCode === null,
  );

  for (const child of activeChildren) child.kill("SIGTERM");

  await Promise.race([
    Promise.all(activeChildren.map(waitForClose)),
    delay(5_000),
  ]);

  for (const child of activeChildren) {
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
  }

  process.exit(exitCode);
}

function waitForClose(child) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((resolve) => child.once("close", resolve));
}

function exitDescription(code, signal) {
  return signal ? `sinal ${signal}` : `codigo ${code ?? "desconhecido"}`;
}

function messageFrom(error) {
  return error instanceof Error ? error.message : String(error);
}

function fail(message) {
  console.error(`\nErro: ${message}\n`);
  process.exit(1);
}
