<div align="center">

# 🏗️ Raghunandan Technologies

<img src="https://img.shields.io/badge/React-06101C?style=for-the-badge&logo=react&logoColor=FFCF5C" />
<img src="https://img.shields.io/badge/TypeScript-06101C?style=for-the-badge&logo=typescript&logoColor=FFCF5C" />
<img src="https://img.shields.io/badge/Express-06101C?style=for-the-badge&logo=express&logoColor=FFCF5C" />
<img src="https://img.shields.io/badge/Drizzle_ORM-06101C?style=for-the-badge&logo=drizzle&logoColor=FFCF5C" />

**[Live site ↗](https://raghunandan-technologies.vercel.app)**

</div>

The company website — a React front end on a Radix UI component base, served by an Express
API with Drizzle ORM over Neon serverless Postgres.

## Layout

```
client/      React + Vite front end, Radix UI primitives, react-hook-form
server/      Express application
api/         serverless entry point for Vercel
shared/      types and Drizzle schema shared across both sides
```

Sharing the schema through `shared/` means the API and the forms validate against the same
definitions rather than drifting apart.

## Stack

| Layer | Choice |
|:--|:--|
| Front end | React · TypeScript · Vite |
| Components | Radix UI · Tailwind |
| Forms | `react-hook-form` + `@hookform/resolvers` |
| API | Express |
| Database | Drizzle ORM · Neon serverless Postgres |
| Hosting | Vercel |

## Running locally

```bash
npm install
cp .env.example .env      # DATABASE_URL for your Neon instance
npm run dev
```

`drizzle.config.ts` holds the migration configuration.

---

<div align="center">
<sub>Built by <a href="https://github.com/Milan-Baldaniya">Milan Baldaniya</a> · Full-Stack AI / LLM Application Engineer</sub>
</div>
