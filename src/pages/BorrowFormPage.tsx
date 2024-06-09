import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { borrowArticle } from "../services/articleSerivce";
import { useArticles } from "../hooks/useArticles";
const schema = z.object({
  borrower: z.string().min(3, { message: "Must be a valid borrower" }),
});

type FormData = z.infer<typeof schema>;

export default function BorrowFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useArticles();

  if (!id) navigate("/");

  const borrowedArticle = articles.find((a) => a.id === id);

  if (borrowedArticle?.isborrowable === false) navigate("/");

  async function onSubmit(data: FormData) {
    console.log("submitted", data);
    if (id) {
      await borrowArticle(id, data);
      navigate("/");
    }
  }

  return (
    <div className="h-screen grid place-items-center place-content-center">
      <h1 className="mb-4 text-center font-bold text-3xl">{id}</h1>
      <div className="p-10 shadow rounded-3xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Borrower Name</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register("borrower")}
            />

            {errors.borrower && (
              <p className="text-error">{errors.borrower.message}</p>
            )}
          </div>

          <div className="grid place-items-center mt-4">
            <button className="btn btn-primary" disabled={!isValid}>
              Borrow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
