interface IAuthHeader {
    title: string
}

export const AuthHeader = ({ title }: IAuthHeader) => (
    <h1 className="text-2xl text-zinc-800 mb-6">{ title }</h1>
)