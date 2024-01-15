/* eslint-disable react/prop-types */
import { Button, Descriptions } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";

export default function Overview({account}) {

  const fraudProbability = Math.floor(Math.random() * 101);
  const kycCompleted =  Math.random() < 0.5;
  let probabilityColor = 'green';

  if (fraudProbability > 80) {
    probabilityColor = 'red';
  } else if (fraudProbability > 40) {
    probabilityColor = 'orange';
  }

  return (
    <div>

    <div className="w-full flex justify-end mt-5">
      <Button className="w-[200px] bg-[#2E6B75] text-white">Download Fraud Report</Button>
    </div>

    <div className="my-10 flex justify-evenly">
      <div className="shadow-lg p-5 w-[40%]">
        <h3 className="mb-3">Account Details</h3>
        <Descriptions>
          <DescriptionsItem span={3} label="name">{account.name}</DescriptionsItem>
          <DescriptionsItem span={3} label="account id">{account.id}</DescriptionsItem>
          <DescriptionsItem span={3} label="Current balance">
            {Math.floor(Math.random() * (500000 - 100000) + 100000)}
          </DescriptionsItem>
          <DescriptionsItem span={3} label="fraud probability">
            <p style={{color: probabilityColor}} className={`font-semibold`}>{fraudProbability}</p>
          </DescriptionsItem>
          <DescriptionsItem span={3} label="KYC">
            <p style={{color: kycCompleted?"green":"red"}}>{kycCompleted? "Completed": "pending"}</p>
          </DescriptionsItem>
        </Descriptions>
      </div>

      <div className="p-5 shadow-lg w-[50%]">
        <table className="flex flex-col gap-y-2 border-collapse">
          <div className="flex gap-x-2 border-b">
            <th className="border-r w-[30%] text-left">Date</th>
            <th className="border-r w-[30%] text-left">Description</th>
            <th className="border-r w-[30%] text-left">Amount</th>
          </div>

          <div className="flex gap-x-3">
            <td className="border-r w-[30%]">12-12-2023</td>
            <td className="border-r w-[30%]">Transferred to 242425</td>
            <td className="border-r w-[30%]">200000</td>
          </div>
          <div className="flex gap-x-3">
            <td className="border-r w-[30%]">08-11-2023</td>
            <td className="border-r w-[30%]">Transferred to 141235</td>
            <td className="border-r w-[30%]">100000</td>
          </div>
          <div className="flex gap-x-3">
            <td className="border-r w-[30%]">12-10-2023</td>
            <td className="border-r w-[30%]">Transferred to 24144</td>
            <td className="border-r w-[30%]">200000</td>
          </div>
          <div className="flex gap-x-3">
            <td className="border-r w-[30%]">08-10-2023</td>
            <td className="border-r w-[30%]">Transferred to 95230</td>
            <td className="border-r w-[30%]">400000</td>
          </div>
        </table>
      </div>
    </div>
    </div>
  )
}
