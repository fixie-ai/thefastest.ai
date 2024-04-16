# thefastest.ai
Website with current metrics on the fastest AI models.

## Website
Everything is in the `\website` folder. Pushing to main branch will trigger GitHub action to build and publish the site.

## Data
The data displayed in the table is from a custom benchmarking tool (full [source is on GitHub](https://github.com/fixie-ai/ai-benchmarks)). We run this tool daily in multiple [regions](https://fly.io/docs/reference/regions/) so that we have benchmarks for multiple geos.

There is a script (`GenerateLatestData.ts`) that can be run with `yarn dlx tsx ./utils/GenerateLatestData.ts`. This will generate the file at https://storage.googleapis.com/thefastest-data/latest/text/latest.json

## Other
Built using Astro and the https://github.com/nicdun/astro-tech-blog
