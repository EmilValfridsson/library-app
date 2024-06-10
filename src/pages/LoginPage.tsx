import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { auth } from "../services";
import { useUserContext } from "../context/UserContext";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username is too short." }),
  password: z.string().min(1, { message: "Password is required." }),
});
type FormData = z.infer<typeof schema>;
export default function LoginPage() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const user = auth.getCurrentUser();
  const { setUser } = useUserContext();
  async function onSubmit(data: FormData) {
    try {
      await auth.login(data);
      const isUser = await auth.getCurrentUser();
      setUser(isUser);
      navigate("/");
    } catch (error: any) {
      setError("username", { message: error.response.data });
    }
  }

  if (user) navigate("/");

  return (
    <div className="h-screen grid place-items-center place-content-center">
      <h1 className="mb-4 text-center font-bold text-3xl">Login</h1>
      <div className="p-10 shadow rounded-3xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              {...register("username")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.username && (
              <p className="text-error">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              {...register("password")}
              className="input input-bordered w-full max-w-3xl"
            />
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>
          <div className="grid place-items-center mt-4">
            <button className="btn btn-primary" disabled={!isValid}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
