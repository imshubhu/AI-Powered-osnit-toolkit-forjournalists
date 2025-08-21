export default function RedditCard({ item }: { item: any }) {
    return (
        <div className="border p-4 mb-3 rounded shadow ">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-lg ">{item.title}</h2>
                    {/* <p className="text-sm text-gray-500">r/{item.subreddit}</p>
                    <p className="my-2 text-gray-700">{item.snippet}</p> */}
                    <a href={item.url} target="_blank" className="text-blue-500 underline text-sm">View Thread</a>
                </div>
                {
                    item.img &&
                    <div className="w-[120px] h-[90px]">
                        <img className="w-full h-full" src={item.img} />
                    </div>
                }
            </div>
        </div>
    );
}
