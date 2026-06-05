import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://tmdb.org';
const POSTER_SIZE = 'w342';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  overview?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const fullPosterPath = movie.poster_path
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : 'https://placehold.co';

  return (
    <Card className="group overflow-hidden shadow-sm  hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <img
          src={fullPosterPath}
          alt={`${movie.title} Poster`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <CardHeader className="p-4 pb-1">
        <CardTitle
          className="text-base font-bold text-neutral-50 line-clamp-1 group-hover:text-blue-600 transition-colors"
          title={movie.title}
        >
          {movie.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-1 flex-1">
        <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </CardContent>
    </Card>
  );
}
