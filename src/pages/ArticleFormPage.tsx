import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { getArticle, saveArticle } from "../services/articleSerivce";
import { Article } from "../types";
import { useCategories } from "../hooks/useCatgories";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title is required" }),
  author: z.string().min(3, { message: "Author is required." }).optional(),
  nbrPages: z
    .number({ invalid_type_error: "Must be a number." })
    .gte(1, { message: "Min 1 page" })
    .optional(),
  runTimeMinutes: z
    .number({ invalid_type_error: "Must be a number." })
    .gte(1, { message: "Min 1 minute" })
    .optional(),
  type: z.string().min(3, { message: "Type must be selected" }),
  isBorrowable: z
    .string({ message: "Borrowable must be selected" })
    .transform((value) => value === "true"),
  categoryId: z.string().min(1, { message: "Category must be selected" }),
});

type FormData = z.infer<typeof schema>;

export default function ArticleFormPage() {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [selectedType, setSelectedType] = useState("");

  const { categories } = useCategories();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      if (!id) return;

      const { data: article } = await getArticle(id);

      if (!article) return;

      reset(mapToFormData(article));
      setSelectedType(article.type);
    }
    fetch();
  }, []);

  function mapToFormData(article: Article) {
    if (article.type === "DVD" || article.type === "Audiobook") {
      return {
        id: article.id,
        title: article.title,
        type: article.type,
        categoryId: article.categoryId,
        runTimeMinutes: article.runTimeMinutes,
        isBorrowable: article.isBorrowable,
      };
    }
    return {
      id: article.id,
      title: article.title,
      type: article.type,
      categoryId: article.categoryId,
      author: article.author,
      nbrpages: article.nbrPages,
      isborrowable: article.isBorrowable,
    };
  }
  async function onSubmit(data: FormData) {
    console.log("submitted", data);
    await saveArticle(data);
    navigate("/");
  }

  return (
    <div className="h-screen grid place-items-center place-content-center">
      <h1 className="mb-4 text-center font-bold text-3xl">New Article</h1>
      <div className="p-10 shadow rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              id="type"
              className="select select-bordered w-full max-w-xs"
              {...register("type")}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Choose Type</option>
              <option value="DVD">DVD</option>
              <option value="Audiobook">Audiobook</option>
              <option value="Dictionary">Dictionary</option>
              <option value="Book">Book</option>
            </select>
            {errors.type && <p className="text-error">{errors.type.message}</p>}
          </div>

          {selectedType && (
            <>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-error">{errors.title.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("categoryId")}
                >
                  <option />
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-error">{errors.categoryId.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Borrowable</label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("isBorrowable")}
                >
                  {selectedType !== "Dictionary" && (
                    <>
                      <option />
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </>
                  )}
                  <option value="false">False</option>
                </select>
                {errors.isBorrowable && (
                  <p className="text-error">{errors.isBorrowable.message}</p>
                )}
              </div>
            </>
          )}

          {(selectedType === "DVD" || selectedType === "Audiobook") && (
            <>
              <div className="mb-3">
                <label className="form-label">RunTimeMinutes</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("runTimeMinutes", { valueAsNumber: true })}
                />
                {errors.runTimeMinutes && (
                  <p className="text-error">{errors.runTimeMinutes.message}</p>
                )}
              </div>
            </>
          )}

          {(selectedType === "Book" || selectedType === "Dictionary") && (
            <>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("author")}
                />
                {errors.author && (
                  <p className="text-error">{errors.author.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Number of Pages</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("nbrPages", { valueAsNumber: true })}
                />
                {errors.nbrPages && (
                  <p className="text-error">{errors.nbrPages.message}</p>
                )}
              </div>
            </>
          )}

          <div className="d-grid justify-content-center mt-4">
            <button className="btn btn-primary" disabled={!isValid}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
