import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "./floating-input"
import { useAuth } from "@/components/auth/auth-context"
import { useNavigate, Link } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
})

type FormValues = z.infer<typeof schema>

export default function SignupForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await signup(values.email, values.password, values.name)
      navigate("/login")
    } catch (e: any) {
      // Error handled in AuthContext
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      noValidate
    >
      <FloatingInput label="Name" placeholder=" " error={errors.name?.message} {...register("name")} />
      <FloatingInput label="Email" type="email" placeholder=" " error={errors.email?.message} {...register("email")} />
      <FloatingInput
        label="Password"
        type="password"
        placeholder=" "
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" className="w-full h-11" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="text-primary underline underline-offset-4" to="/login">
          Sign in
        </Link>
      </p>
    </motion.form>
  )
}
