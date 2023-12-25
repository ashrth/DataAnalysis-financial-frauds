/* eslint-disable react/prop-types */
import { Button, Input } from "antd";
import { useState } from "react";
import axios from 'axios';
import Papa from 'papaparse';

export default function FileUploader({headers}) {

    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState();

    const handleChange = (e)=>{
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = ()=>{
        if (!file) {
            // toast.error(`Please Select a File`, {
            //   style: toastStyle,
            // });
            return;
          }
          setIsLoading(true);
          if (file) {
            Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: async (result) => {
                if (result.data.length == 0) {
                //   toast.error(`Records not found`, {
                //     style: toastStyle,
                //   });
                  console.log('Empty file');
                  setIsLoading(false);
                  return;
                }
      
                console.log(result);

                let recievedHeaders = Object.keys(
                  result.data[0],
                );
      
                if (recievedHeaders.length === 0) {
                  console.log('No records');
                  setIsLoading(false);
                  return;
                }
      
                const valid = headers.every((header) =>
                  recievedHeaders.includes(header),
                );
                console.log(valid);
                if (!valid) {
                //   toast.error(`File Invalid, Headers not found`, {
                //     style: toastStyle,
                //   });
                  setIsLoading(false);
                  return;
                }
                const formData = new FormData();

                formData.append('file', file);
                try {
                  console.log('uploading...');
                  const response = await axios.post(
                    '/api/inventory/import',
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    },
                  );
                  console.log(response.data);
                  if (response?.status === 200) {
                    // toast.success(`File uploaded successfully.`, {
                    //   style: toastStyle,
                    // });
                  }
                  setIsLoading(false);
                } catch (error) {
                  console.error('Error uploading file:', error);
                  setIsLoading(false);
                }
              },
              error: (error) => {
                console.error('Error parsing CSV:', error);
                setIsLoading(false);
              },
            });
        }
    }

  return (
    <div className="flex flex-col gap-y-2">
        <Input type="file" accept=".csv" onChange={handleChange} disabled={isLoading} />
        <Button className='w-[150px] rounded-lg bg-black text-white' onClick={handleSubmit} loading={isLoading} >Submit</Button>
    </div>
  )
}
