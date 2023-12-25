import { analysisDataHeaders, feedDataHeaders } from "../../constants/csvHeaders";
import FileUploader from "./FileUploader";


export default function Csv() {
  return (
    <div className="m-5 shadow-lg flex flex-col gap-y-10 p-5 py-10 w-[80%] mx-auto mt-10 rounded-lg">
        <div className="flex flex-col gap-y-4">
            <h3>Upload data to feed model</h3>
            <FileUploader headers={feedDataHeaders} />
        </div>
        <div className="flex flex-col gap-y-4">
            <h3>Upload accounts for analysis</h3>
            <FileUploader headers={analysisDataHeaders} />
        </div>
    </div>
  )
}
