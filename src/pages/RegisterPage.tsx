import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { user } from "../services";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(1, { message: "Username is required." })
    .email({ message: "Invalid email." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(5, { message: "Password is too short." }),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });
  const navigate = useNavigate();
  async function onSubmit(data: FormData) {
    try {
      await user.register(data);

      navigate("/");
    } catch (error: any) {
      if (error.response.status === 400) {
        setError("username", { message: error.response.data });
      }
    }
  }
  return (
    <div className="h-screen grid place-items-center place-content-center">
      <h1 className="mb-4 text-center font-bold text-3xl">Register Page</h1>
      <div className="p-10 shadow rounded-3xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              {...register("name")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              {...register("username")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              {...register("password")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="d-grid justify-content-center mt-4">
            <button className="btn btn-primary" disabled={!isValid}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
