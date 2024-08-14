const overviewPageLimit = 6

const defaultPaging:PagingParams = {
    page: 1,
    limit: 0
}

// taken from https://nextjs.org/docs/app/api-reference/file-conventions/page
interface SeachParams{ [key: string]: string | string[] | undefined }

interface PagingParams{
    page: number,
    limit: number
}

export {overviewPageLimit, defaultPaging}
export type {PagingParams, SeachParams}