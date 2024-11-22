# Zelda Item Compendium

An interactive web application that provides an AI-enhanced browsing experience for items from The Legend of Zelda: Breath of the Wild.

Created by Jonathan Bridges ([@jonathanbridges](https://github.com/jonathanbridges))

## Features

- **AI-Powered Item Descriptions**: Uses OpenAI to generate dynamic, jovial descriptions of items in the compendium
- **Vector Search Capabilities**: Leverages Weaviate for efficient item retrieval and semantic search
- **Caching**: Implements intelligent caching strategies for optimal performance

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Weaviate instance
- An OpenAI API key

### Installation & Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/zelda-ai.git
cd zelda-ai
npm install
```

2. Create a `.env.local` file in the root directory:

```env
WEAVIATE_URL=your-weaviate-instance-url
WEAVIATE_ADMIN_KEY=your-weaviate-api-key
OPENAI_API_KEY=your-openai-api-key
```

3. Initialize the Weaviate database with item data:

```bash
npm run init
```

4. Start the development server:

```bash
npm run dev
```

## API Routes

### GET `/`

The main endpoint for browsing items with pagination and category filtering.

**Query Parameters:**

- `category` (optional): Filter items by category (e.g., "weapons", "materials", "food")
- `page` (optional): Page number for pagination (default: 1)

### GET `/api/search`

Semantic search endpoint that uses AI to generate descriptions for search results.

**Query Parameters:**

- `query` (required): Search query string
- `page` (optional): Page number for pagination

### GET `/api/item/[id]`

Retrieves a single item with an AI-generated creative description.

**Parameters:**

- `id` (number): The unique identifier of the item

## Technologies Used

### Frontend

- **Next.js 15**: React framework for production
- **Material UI**: Component library for consistent design
- **Framer Motion**: Powers smooth animations and transitions
- **React Suspense**: Enables lazy loading for improved performance

### Backend

- **Weaviate**: Vector database for semantic search capabilities
- **OpenAI**: Generates creative item descriptions
- **Next.js API Routes**: Handles server-side logic and caching

### Performance Features

- **Image Optimization**: Using Next.js Image component with Sharp
- **Lazy Loading**: Components and images load as needed
- **Route-based Code Splitting**: Automatic code splitting by routes
- **SWR Caching**: Intelligent data caching with stale-while-revalidate
- **Animations**: Smooth transitions and loading states via Framer Motion

## Performance Optimizations

- Lazy loading of components and images for faster initial page load
- Efficient animations using Framer Motion's `AnimatePresence`
- Server-side caching of API responses (60s cache, 30s stale-while-revalidate)
- Optimized images using Next.js Image component
- Debounced search inputs for reduced API calls

```

```
