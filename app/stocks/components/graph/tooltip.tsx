export const CustomToolTip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
    
        return (
            <div className="bg-white p-3 border-gray-300 rounded shadow-lg">
                <p className="text-sm font-semibold text-gray-800"> {`Date: ${label}`}</p>
                <p className="text-sm text-green-600"> {`Close Price: $${data.close}`}</p>

                {data.open &&  (
                    <p className="text-sm text-green-600"> {`Open Price: $${data.open.toFixed(2)}`}</p>
                )}

                {data.high &&  (
                    <p className="text-sm text-green-600"> {`High Price: $${data.high.toFixed(2)}`}</p>
                )}

                {data.low &&  (
                    <p className="text-sm text-green-600"> {`Low Price: $${data.low.toFixed(2)}`}</p>
                )}

                {data.volume &&  (
                    <p className="text-sm text-green-600"> {`Volume: $${data.volume.toFixed(2)}`}</p>
                )}

                {data.trendValue && (
                    <p style={{color: "#fbbf24"}} className="text-sm"> {`Trend Line: ${data.trendValue.toFixed(2)}`}</p>
                )}
            </div>
        )
    }

    return null
}