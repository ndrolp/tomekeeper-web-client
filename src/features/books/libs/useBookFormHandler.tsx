import { useAppForm } from "@/common/components/form"

export const useBookFormHandler = () => {
    const form = useAppForm({
        defaultValues: {
            book: {
                title: "",
                genre: "",
                author: "",
                description: "",
                externalCoverUrl: "",
                seriesOrder: ""
            },
            serie: {
                id: "",
                name: "",
                description: ""
            }
        }
    })
    return (
        form
    )
}
