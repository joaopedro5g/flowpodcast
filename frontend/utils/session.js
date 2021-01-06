import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',
    cookieName: 'session',
    cookieOptions: {
      secure: false,
    },
  })
}