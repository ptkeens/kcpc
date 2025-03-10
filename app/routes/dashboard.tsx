import type { MetaArgs } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Separator } from "~/components/ui/separator"
import { ProtectedRoute } from "~/components"

export function meta() {
    return [
        { title: "Dashboard | Kit Car Part Catalog" },
        { name: "description", content: "Your kit car parts dashboard" },
    ]
}

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <Button>Add New Part</Button>
                </div>

                <Tabs defaultValue="overview" className="mb-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="parts">Parts</TabsTrigger>
                        <TabsTrigger value="activities">Activities</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recent Activities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        You have no recent activities.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Parts Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        No parts cataloged yet.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <li>
                                            <Button
                                                variant="ghost"
                                                className="text-primary hover:text-primary p-0 h-auto"
                                            >
                                                Add new part
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                variant="ghost"
                                                className="text-primary hover:text-primary p-0 h-auto"
                                            >
                                                Export catalog
                                            </Button>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="parts">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Parts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    You haven't added any parts to your catalog
                                    yet.
                                </p>
                                <Separator className="my-4" />
                                <Button>Add Your First Part</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activities">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    No recent activities to display.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </ProtectedRoute>
    )
}
