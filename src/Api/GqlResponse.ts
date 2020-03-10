export default interface GqlResponse {
    error: { message: string, graphQLErrors: Record<string, string>, networkError: Error | null } | undefined,
    data: any | undefined,
}