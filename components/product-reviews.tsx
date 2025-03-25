import { cn } from "@/lib/cn";
import { formatDate } from "@/utils/format";

import { StarIcon } from "lucide-react";

interface Props {
  reviews: Review[];
}

export function ProductReviews({ reviews }: Props) {
  if (!reviews.length) return null;

  return (
    <section className="space-y-12">
      <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
        Avaliações ({reviews.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={cn(
              "space-y-4 bg-muted/50 p-4 py-8 md:px-8 rounded-xl",
              reviews.length === 1 && "md:col-span-2"
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">{review.headline}</p>

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`size-4 text-accent-foreground ${
                      i < review.rating
                        ? "text-indigo-700 fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {review.content}
            </p>

            <p className="text-xs text-muted-foreground">
              {review.name} &bull;{" "}
              {formatDate(review.createdAt, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
