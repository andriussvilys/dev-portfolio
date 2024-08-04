const overviewPageLimit = 3

// taken from https://nextjs.org/docs/app/api-reference/file-conventions/page
interface SeachParams{ [key: string]: string | string[] | undefined }

interface PagingParams{
    page: number,
    limit: number
}

const defaultPaging:PagingParams = {
    page: 1,
    limit: overviewPageLimit
}

export {overviewPageLimit, defaultPaging}
export type {PagingParams, SeachParams}