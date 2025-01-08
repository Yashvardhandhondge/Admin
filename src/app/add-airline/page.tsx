import { ContentLayout } from "@/components/admin-panel/content-layout"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AddAirlineForm from "@/components/add-airline/add-airline"

export default function AddAirlinePage() {
    return (
        <ContentLayout title="Add Airline">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Airline</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-6">
                <AddAirlineForm />
            </div>
        </ContentLayout>
    )
}

