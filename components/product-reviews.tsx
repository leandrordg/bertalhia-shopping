import { cn } from "@/lib/tailwind-merge";
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
        Avaliações
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={cn(
              "space-y-4 bg-muted/50 p-4 md:p-8 rounded-xl hover:bg-muted",
              reviews.length === 1 && "md:col-span-2"
            )}
          >
            <div>
              <p className="font-medium">{review.headline}</p>
              <p>{review.content}</p>
            </div>

            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-6 text-accent-foreground ${
                    i < review.rating
                      ? "text-indigo-700 fill-current"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
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
