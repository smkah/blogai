import { createPost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CreatePost() {
  return (
    <div className="container max-w-4xl py-4 space-y-4">
      <h1 className="text-2xl font-bold">Criar novo post</h1>
      <div className="flex flex-col gap-2">
        <form action={createPost as any}>
          <Button>Criar post by IA</Button>
        </form>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPost as any} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief description of your post"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your post content here..."
                className="min-h-[300px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="url"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="React, NextJS, Web Development (comma separated)"
              />
            </div>

            <Separator className="my-4" />

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="reset">
                Cancel
              </Button>
              <Button type="submit">Publish Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
