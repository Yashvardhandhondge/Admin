import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

function MetaTags() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Meta Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label>URL</label>
                        <Textarea placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                        <label>Canonical Tag</label>
                        <Input placeholder="https://www.example.com" />
                    </div>
                    <div className="space-y-2">
                        <label>Title (60 characters)</label>
                        <Textarea />
                    </div>
                    <div className="space-y-2">
                        <label>Description (165 characters)</label>
                        <Textarea />
                    </div>
                    <div className="space-y-2">
                        <label>Keywords</label>
                        <Textarea />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MetaTags