import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

export default function DashboardLoading() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-9 w-32" />
            </div>

            <Tabs defaultValue="overview" className="mb-6">
                <TabsList>
                    <TabsTrigger value="overview" disabled>
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="parts" disabled>
                        Parts
                    </TabsTrigger>
                    <TabsTrigger value="activities" disabled>
                        Activities
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-36" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
