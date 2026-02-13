# 🚀 Quick Deployment Checklist

Use this checklist when deploying the Forge Todo App to production.

## Pre-Deployment

- [ ] Code pushed to GitHub repository
- [ ] All tests passing locally
- [ ] Environment variables documented in `.env.example` files

## Database Setup

- [ ] Neon account created
- [ ] PostgreSQL database created
- [ ] Database connection string copied

## Backend Deployment

- [ ] Platform chosen (Vercel/Railway/Render)
- [ ] Backend repository connected
- [ ] Environment variables configured:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_USER_SECRET` (generated securely)
  - [ ] `PORT`
  - [ ] `FRONT_END_URL`
- [ ] Backend deployed successfully
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] Health check endpoint tested (`/health`)

## Frontend Deployment

- [ ] Vercel account created
- [ ] Frontend repository connected
- [ ] Environment variables configured:
  - [ ] `NEXT_PUBLIC_API_BASE_URL` (backend URL)
  - [ ] `BACKEND_URL` (backend URL)
- [ ] Frontend deployed successfully
- [ ] No trailing slashes in API URLs

## Post-Deployment Verification

- [ ] Health endpoint returns 200 OK
- [ ] Frontend loads without errors
- [ ] Can sign up for new account
- [ ] Can log in successfully
- [ ] Can create todos
- [ ] Can update todos
- [ ] Can delete todos
- [ ] No CORS errors in browser console
- [ ] All API calls successful

## Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL certificate active (auto with Vercel)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Rate limiting configured

---

**Need detailed instructions?** See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Issues?** Check the Troubleshooting section in [DEPLOYMENT.md](./DEPLOYMENT.md)
