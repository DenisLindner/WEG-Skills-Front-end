export const COOKIE_NAME = 'weg_skills_session';
const production = process.env.NODE_ENV === "production"

export const cookieOptions = {
    httpOnly: true,
    secure: production,
    sameSite: 'lax' as const,
    path: '/'
};