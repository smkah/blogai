<p align="center">
  <h1 align="center">BlogAI - AI-Powered Blog Generator</h1>
</p>

<p align="center">
 Create engaging blog content powered by AI technology
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#usage"><strong>Usage</strong></a>
</p>
<br/>

## Features

- AI-powered blog post generation using advanced language models
- Customizable post topics and writing styles
- Rich text editor for post refinement
- SEO optimization suggestions
- Automatic image suggestions for posts
- Post scheduling and publishing
- Analytics dashboard
- Mobile-responsive design
- Dark/Light mode support

## Tech Stack

- [Next.js](https://nextjs.org) - React framework for production
- [Supabase](https://supabase.com) - Backend and authentication
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- AI Integration (Multiple providers supported)
- Analytics tools

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/blogai.git
   ```

2. Install dependencies:

   ```bash
   cd blogai
   npm install
   ```

3. Create a `.env.local` file with your environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   AI_API_KEY=your_ai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Usage

1. **Sign Up/Login**: Create an account or login to access the dashboard

2. **Create New Post**:

   - Click "New Post" button
   - Enter your desired topic or keywords
   - Select writing style and tone
   - Generate content using AI
   - Edit and refine the generated content
   - Add images and formatting

3. **Publish**:

   - Preview your post
   - Set publishing schedule (optional)
   - Publish immediately or schedule for later

4. **Monitor**:
   - Track post performance
   - View reader engagement
   - Analyze traffic statistics

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
