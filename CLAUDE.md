# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React TypeScript frontend for a recipe library application. Built with Vite, Chakra UI, and Formik. Requires a separate backend API server (https://github.com/rb1193/recipe-api).

## Commands

- **Dev server**: `yarn start` - Runs on https://local.recipes.arbee.me:3000
- **Build**: `yarn build` - TypeScript check + Vite production build
- **Preview build**: `yarn serve`

## Local Development Setup

SSL certificates required:
1. Generate with mkcert for `local.recipes.arbee.me`
2. Place as `certs/server.pem` and `certs/key.pem`

Environment: Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL.

## Architecture

**Feature-based organization:**
- `src/Api/` - API client layer with fetch-based requests, CORS credentials enabled
- `src/Auth/` - Authentication components
- `src/Recipes/` - Recipe feature screens (list, search, create, edit, view)
- `src/Contracts/` - TypeScript interfaces for domain models (Recipe, User)
- `src/lib/` - Reusable components: API state handling, form inputs, buttons, modals, pagination
- `src/Context.tsx` - User authentication context provider

**Key patterns:**
- API functions return `Request` objects used with fetch; responses typed as `RestResponse<T>` or `PaginatedRestResponse<T>`
- Forms use Formik with Yup validation schemas; custom components (`TextInput`, `TextAreaInput`) integrate via `useField()` hook
- Pagination via custom `usePagination` hook synced to URL query params
- Error handling through `RequestError` class and `parseRequestError()` utility

**Environment variables use Vite format:** `import.meta.env.VITE_API_URL`
