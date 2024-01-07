import { analysisDataHeaders, feedDataHeaders } from "../../constants/csvHeaders";
import FileUploader from "./FileUploader";


export default function Csv() {
  return (
    <div className="m-5 flex flex-col gap-y-12 p-5 py-10 mx-auto mt-10 rounded-lg">
      <div className="flex flex-col gap-y-4 max-w-[500px]">
        <h3 className="font-semibold text-lg">Upload data to feed model</h3>
        <FileUploader headers={feedDataHeaders} />
      </div>
      <div className="flex flex-col gap-y-4 max-w-[500px]">
        <h3 className="font-semibold text-lg">Upload accounts for analysis</h3>
        <FileUploader headers={analysisDataHeaders} />
      </div>
    </div>
  )
}
