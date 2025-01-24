import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, Trash2 } from 'lucide-react'
import { useAirlineStore } from '../../store/useAirlineStore';

function Content() {
    const [content, setContent] = React.useState([{ type: '', content: '' }]);
    const {
        contentTypes,
        loading
    } = useAirlineStore();
    return (
        <div>
            <TabsContent className='mt-4' value="content">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Content
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setContent([...content, { type: '', content: '' }])}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Content
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.No.</TableHead>
                                    <TableHead>Content Type</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {content.map((_item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm' name="" id="">
                                                <option value="">Select content type</option>
                                                {loading ? (
                                                    <option>Loading...</option>
                                                ) : (
                                                    contentTypes.map((contentType) => (
                                                        <option key={contentType.ContentTypeId} value={contentType.ContentTypeId}>
                                                            {contentType.ContentTypeName}
                                                        </option>
                                                    ))
                                                )}
                                                {contentTypes.map((contentType) => (
                                                    <option key={contentType.ContentTypeId} value={contentType.ContentTypeId}>
                                                        {contentType.ContentTypeName}
                                                    </option>
                                                ))}
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <Input />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    const newContent = [...content]
                                                    newContent.splice(index, 1)
                                                    setContent(newContent)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    )
}

export default Content