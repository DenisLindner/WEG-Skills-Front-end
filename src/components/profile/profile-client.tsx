"use client"

import {UserProfile} from "@/types/user/user-profile";
import {useRef, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Camera, KeyRound, LoaderCircle, Save, Trash2, UserRound} from "lucide-react";
import {imageTypes, maxImageSize, uploadMedia} from "@/lib/upload";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {deleteProfileAction} from "@/actions/user/me/delete-profile-action";
import {updateProfileAction} from "@/actions/user/me/update-profile-action";
import {useRouter} from "next/navigation";
import {changePasswordAction} from "@/actions/user/me/change-password-action";
import {createProfileImageUploadAction} from "@/actions/user/me/create-profile-image-upload-action";
import {completeUploadAction} from "@/actions/media/complete-upload-action";
import {ApiFieldErrors} from "@/types/common/api-field-errors";
import {PublicApiError} from "@/types/common/public-api-error";
import {UserProfileInput} from "@/types/user/user-profile-input";

type Notice = {
    kind: "success" | "error"
    text: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

function phoneDigits(value: string) {
    return value.replace(/\D/g, "").slice(0, 11)
}

function formatPhone(value: string) {
    const digits = phoneDigits(value)

    if (!digits) {
        return ""
    }
    if (digits.length <= 2) {
        return `(${digits}`
    }
    if (digits.length <= 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    }
    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function friendlyError(error: unknown) {
    return error instanceof Error && error.message === "Não foi possível enviar o arquivo."
        ? error.message
        : "Não foi possível concluir a operação. Tente novamente."
}

function translateProfileErrors(errors: ApiFieldErrors) {
    const translated = {...errors}

    if (translated.name) {
        translated.name = "Informe um nome entre 3 e 128 caracteres."
    }
    if (translated.email) {
        translated.email = "Informe um e-mail válido."
    }
    if (translated.phone) {
        translated.phone = "Informe um telefone com DDD e 10 ou 11 números."
    }
    if (translated.birthday) {
        translated.birthday = "Informe uma data de nascimento anterior a hoje."
    }

    return translated
}

function translatePasswordErrors(errors: ApiFieldErrors) {
    const translated = {...errors}

    if (translated.actualPassword) {
        translated.actualPassword = "Verifique a senha atual informada."
    }
    if (translated.password) {
        translated.password = "Use de 8 a 72 caracteres, com letra maiúscula, minúscula, número e caractere especial."
    }

    return translated
}

export function ProfileClient({ profile }: { profile: UserProfile }) {
    const [pending, setPending] = useState("")
    const [notice, setNotice] = useState<Notice | null>(null)
    const [noticePassword, setNoticePassword] = useState<Notice | null>(null)
    const [profileErrors, setProfileErrors] = useState<ApiFieldErrors>({})
    const [passwordErrors, setPasswordErrors] = useState<ApiFieldErrors>({})
    const [phone, setPhone] = useState(() => formatPhone(profile.phone ?? ""))
    const fileRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const busy = pending !== ""

    function handleActionFailure(status: number, error: PublicApiError, fallback: string) {
        if (status === 401) {
            router.replace("/login?next=/profile")
            router.refresh()
            return
        }

        const errors = translateProfileErrors(error.fieldErrors ?? {})
        setProfileErrors(errors)
        setNotice({
            kind: "error",
            text: Object.keys(errors).length > 0 ? "Verifique os campos destacados." : fallback,
        })
    }

    function handleGeneralFailure(status: number, fallback: string) {
        if (status === 401) {
            router.replace("/login?next=/profile")
            router.refresh()
            return
        }

        setNotice({kind: "error", text: fallback})
    }

    async function saveProfile(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setProfileErrors({})
        const data = new FormData(event.currentTarget)
        const input = {
            name: String(data.get("name") ?? "").trim(),
            email: String(data.get("email") ?? "").trim().toLowerCase(),
            birthday: String(data.get("birthday") ?? ""),
            phone: phoneDigits(String(data.get("phone") ?? "")),
        }
        const errors: ApiFieldErrors = {}

        if (input.name.length < 3 || input.name.length > 128) {
            errors.name = "Informe um nome entre 3 e 128 caracteres."
        }
        if (!input.email) {
            errors.email = "Informe seu e-mail."
        } else if (input.email.length > 128 || !emailPattern.test(input.email)) {
            errors.email = "Informe um e-mail válido."
        }
        if (input.phone && input.phone.length !== 10 && input.phone.length !== 11) {
            errors.phone = "Informe um telefone com DDD e 10 ou 11 números."
        }
        if (input.birthday) {
            const birthday = new Date(`${input.birthday}T00:00:00`)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (Number.isNaN(birthday.getTime()) || birthday >= today) {
                errors.birthday = "Informe uma data de nascimento anterior a hoje."
            }
        }

        if (Object.keys(errors).length > 0) {
            setProfileErrors(errors)
            setNotice({kind: "error", text: "Verifique os campos destacados."})
            return
        }

        setPending("profile")
        setNotice(null)

        try {
            const payload: UserProfileInput = {
                name: input.name,
                email: input.email,
                ...(input.phone ? {phone: input.phone} : {}),
                ...(input.birthday ? {birthday: input.birthday} : {}),
            }
            const result = await updateProfileAction(payload)

            if (!result.success) {
                if (result.status === 409) {
                    setProfileErrors({email: "O e-mail informado já está em uso."})
                    setNotice({kind: "error", text: "Não foi possível atualizar o perfil."})
                    return
                }

                handleActionFailure(result.status, result.error, "Não foi possível atualizar o perfil. Tente novamente.")
                return
            }

            setNotice({kind: "success", text: "Perfil atualizado com sucesso."})
            router.refresh()
        } catch (error) {
            setNotice({kind: "error", text: friendlyError(error)})
        } finally {
            setPending("")
        }
    }

    async function changePassword(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const input = {
            actualPassword: String(data.get("actualPassword") ?? ""),
            password: String(data.get("password") ?? ""),
            confirmation: String(data.get("confirmation") ?? ""),
        }
        const errors: ApiFieldErrors = {}

        if (!input.actualPassword) {
            errors.actualPassword = "Informe sua senha atual."
        } else if (input.actualPassword.length > 72) {
            errors.actualPassword = "A senha atual deve ter no máximo 72 caracteres."
        }
        if (input.password.length < 8 || input.password.length > 72 || !passwordPattern.test(input.password)) {
            errors.password = "Use de 8 a 72 caracteres, com letra maiúscula, minúscula, número e caractere especial."
        }
        if (!input.confirmation) {
            errors.confirmation = "Confirme a nova senha."
        } else if (input.password !== input.confirmation) {
            errors.confirmation = "As novas senhas não coincidem."
        }

        if (Object.keys(errors).length > 0) {
            setPasswordErrors(errors)
            setNoticePassword({kind: "error", text: "Verifique os campos destacados."})
            return
        }

        setPending("password")
        setNoticePassword(null)
        setPasswordErrors({})

        try {
            const result = await changePasswordAction({
                actualPassword: input.actualPassword,
                password: input.password,
            })

            if (!result.success) {
                if (result.status === 401) {
                    setPasswordErrors({actualPassword: "A senha atual está incorreta."})
                    setNoticePassword({kind: "error", text: "Não foi possível alterar a senha."})
                    return
                }

                const errors = translatePasswordErrors(result.error.fieldErrors ?? {})
                setPasswordErrors(errors)
                setNoticePassword({
                    kind: "error",
                    text: Object.keys(errors).length > 0
                        ? "Verifique os campos destacados."
                        : "Não foi possível alterar a senha. Tente novamente.",
                })
                return
            }

            form.reset()
            router.replace("/login")
            router.refresh()
        } catch (error) {
            setNoticePassword({kind: "error", text: friendlyError(error)})
        } finally {
            setPending("")
        }
    }

    async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.currentTarget
        const file = input.files?.[0]
        if (!file) {
            return
        }

        if (!imageTypes.includes(file.type) || file.size <= 0 || file.size > maxImageSize) {
            setProfileErrors({})
            setNotice({kind: "error", text: "Escolha uma imagem JPEG, PNG ou WebP de até 5 MB."})
            input.value = ""
            return
        }

        setPending("avatar")
        setNotice(null)
        setProfileErrors({})

        try {
            const ticketResult = await createProfileImageUploadAction({
                fileName: file.name,
                contentType: file.type,
                size: file.size,
            })

            if (!ticketResult.success) {
                handleGeneralFailure(ticketResult.status, "Não foi possível preparar o envio da imagem. Verifique o formato e o tamanho do arquivo.")
                return
            }

            await uploadMedia(ticketResult.data, file)

            const completionResult = await completeUploadAction(ticketResult.data.mediaId, "me")
            if (!completionResult.success) {
                handleGeneralFailure(completionResult.status, "A imagem foi enviada, mas não foi possível concluir a atualização. Tente novamente.")
                return
            }

            setNotice({kind: "success", text: "Foto atualizada com sucesso."})
            router.refresh()
        } catch (error) {
            setNotice({kind: "error", text: friendlyError(error)})
        } finally {
            setPending("")
            input.value = ""
        }
    }

    async function removeAccount() {
        if (!window.confirm("Excluir sua conta permanentemente? Esta ação não pode ser desfeita.")) return
        setPending("delete")
        setNotice(null)
        setProfileErrors({})

        try {
            const result = await deleteProfileAction()
            if (!result.success) {
                if (result.status === 409) {
                    setNotice({kind: "error", text: "Sua conta possui cursos vinculados. Exclua esses cursos antes de remover a conta."})
                    return
                }

                handleGeneralFailure(result.status, "Não foi possível excluir sua conta. Tente novamente.")
                return
            }

            router.replace("/")
            router.refresh()
        } catch (error) {
            setNotice({kind: "error", text: friendlyError(error)})
        } finally {
            setPending("")
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <Card className="h-fit">
                <CardContent className="flex flex-col items-center p-7">
                    <div className="relative flex size-32 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {profile.pictureUrl ? <img src={profile.pictureUrl} alt={`Foto de ${profile.name}`} className="h-full w-full object-cover" /> : <UserRound className="size-12" />}
                        <button type="button" disabled={busy} onClick={() =>
                            fileRef.current?.click()} className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-center bg-black/55 text-white hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-60">
                            <Camera className="size-4" />
                            <span className="sr-only">Alterar foto</span>
                        </button>
                    </div>
                    <input ref={fileRef} type="file" accept={imageTypes.join(",")} className="sr-only" disabled={busy} onChange={uploadAvatar} />
                    <h2 className="mt-5 text-center text-xl font-semibold">{profile.name}</h2>
                    <p className="mt-1 break-all text-center text-sm text-muted-foreground">{profile.email}</p>
                    {pending === "avatar" && <p className="mt-4 flex items-center gap-2 text-sm text-primary"><LoaderCircle className="size-4 animate-spin" />Enviando imagem...</p>}
                </CardContent>
            </Card>
            <div className="space-y-6">
                {notice && (
                    <div
                        className={notice.kind === "error"
                            ? "rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
                            : "rounded-xl border border-primary/15 bg-secondary p-4 text-sm"}
                        role={notice.kind === "error" ? "alert" : "status"}
                        aria-live="polite"
                    >
                        {notice.text}
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>Dados pessoais</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={saveProfile} noValidate className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    defaultValue={profile.name}
                                    required
                                    minLength={3}
                                    maxLength={128}
                                    aria-invalid={Boolean(profileErrors.name)}
                                    aria-describedby={profileErrors.name ? "name-error" : undefined}
                                />
                                {profileErrors.name && <p id="name-error" className="text-sm text-destructive">{profileErrors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    defaultValue={profile.email}
                                    required
                                    maxLength={128}
                                    aria-invalid={Boolean(profileErrors.email)}
                                    aria-describedby={profileErrors.email ? "email-error" : undefined}
                                />
                                {profileErrors.email && <p id="email-error" className="text-sm text-destructive">{profileErrors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    value={phone}
                                    onChange={(event) => setPhone(formatPhone(event.target.value))}
                                    placeholder="(47) 99999-9999"
                                    maxLength={15}
                                    aria-invalid={Boolean(profileErrors.phone)}
                                    aria-describedby={profileErrors.phone ? "phone-error" : undefined}
                                />
                                {profileErrors.phone && <p id="phone-error" className="text-sm text-destructive">{profileErrors.phone}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="birthday">Data de nascimento</Label>
                                <Input
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    defaultValue={profile.birthday ?? ""}
                                    max={new Date().toISOString().slice(0, 10)}
                                    aria-invalid={Boolean(profileErrors.birthday)}
                                    aria-describedby={profileErrors.birthday ? "birthday-error" : undefined}
                                />
                                {profileErrors.birthday && <p id="birthday-error" className="text-sm text-destructive">{profileErrors.birthday}</p>}
                            </div>
                            <div className="flex items-end">
                                <Button type="submit" disabled={busy}>{pending === "profile" ? <LoaderCircle className="animate-spin" /> : <Save />}Salvar alterações</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                {noticePassword && (
                    <div
                        className={noticePassword.kind === "error"
                            ? "rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
                            : "rounded-xl border border-primary/15 bg-secondary p-4 text-sm"}
                        role={noticePassword.kind === "error" ? "alert" : "status"}
                        aria-live="polite"
                    >
                        {noticePassword.text}
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>Alterar senha</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={changePassword} noValidate className="grid gap-5 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="actualPassword">Senha atual</Label>
                                <Input
                                    id="actualPassword"
                                    name="actualPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    maxLength={72}
                                    aria-invalid={Boolean(passwordErrors.actualPassword)}
                                    aria-describedby={passwordErrors.actualPassword ? "actualPassword-error" : undefined}
                                />
                                {passwordErrors.actualPassword && <p id="actualPassword-error" className="text-sm text-destructive">{passwordErrors.actualPassword}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nova senha</Label>
                                <Input
                                    id="newPassword"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    maxLength={72}
                                    required
                                    aria-invalid={Boolean(passwordErrors.password)}
                                    aria-describedby={passwordErrors.password ? "password-error password-help" : "password-help"}
                                />
                                {passwordErrors.password && <p id="password-error" className="text-sm text-destructive">{passwordErrors.password}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmation">Confirmar senha</Label>
                                <Input
                                    id="confirmation"
                                    name="confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    maxLength={72}
                                    required
                                    aria-invalid={Boolean(passwordErrors.confirmation)}
                                    aria-describedby={passwordErrors.confirmation ? "confirmation-error" : undefined}
                                />
                                {passwordErrors.confirmation && <p id="confirmation-error" className="text-sm text-destructive">{passwordErrors.confirmation}</p>}
                            </div>
                            <p id="password-help" className="text-sm text-muted-foreground sm:col-span-3">Use de 8 a 72 caracteres, com letra maiúscula, minúscula, número e caractere especial.</p>
                            <div className="sm:col-span-3">
                                <Button type="submit" variant="outline" disabled={busy}>{pending === "password" ? <LoaderCircle className="animate-spin" /> : <KeyRound />}Atualizar senha</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card className="border-destructive/20">
                    <CardHeader>
                        <CardTitle className="text-destructive">Zona de risco</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">Contas responsáveis por cursos não podem ser excluídas até que esses cursos sejam removidos.</p>
                        <Button type="button" variant="destructive" onClick={removeAccount} disabled={busy}>{pending === "delete" ? <LoaderCircle className="animate-spin" /> : <Trash2 />}Excluir minha conta</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
