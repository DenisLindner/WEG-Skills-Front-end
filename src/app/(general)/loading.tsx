export default function Loading() {
  return <main className="content-grid animate-pulse py-16" aria-label="Carregando"><div className="h-4 w-32 rounded bg-secondary" /><div className="mt-4 h-10 w-2/3 max-w-xl rounded bg-secondary" /><div className="mt-10 grid gap-6 md:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-72 rounded-2xl bg-secondary" />)}</div></main>
}
