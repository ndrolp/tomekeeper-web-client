import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Image } from 'lucide-react'

export const BookCover = ({
    className = '',
    coverUrl = undefined,
    placeholderImageSize = 64,
    roundedType = 'rounded-t-lg',
}: {
    coverUrl?: string
    placeholderImageSize?: number
    roundedType?: 'rounded-t-lg' | 'rounded-lg'
    className?: string
}) => {
    return (
        <AspectRatio
            className={`bg-muted ${roundedType} ${className}`}
            ratio={180 / 303}
        >
            {coverUrl ? (
                <img
                    src={coverUrl}
                    alt=""
                    className={`h-full w-full ${roundedType}`}
                />
            ) : (
                <div className="h-full w-full grid place-items-center">
                    <Image
                        size={placeholderImageSize}
                        className="text-gray-400 opacity-30"
                    />
                </div>
            )}
        </AspectRatio>
    )
}
