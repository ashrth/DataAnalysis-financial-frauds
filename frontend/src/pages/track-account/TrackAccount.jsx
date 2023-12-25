import { useParams } from "react-router-dom"
import {useAccountsContext} from '../../hooks/useAccounts';
import {Card, Row, Col, Avatar, Radio} from 'antd';
import { useState } from "react";
import Overview from "./Overview";
import MoneyFlow from "./MoneyFlow";

const STATES = {
	OVERVIEW: 'overview',
	MONEYFLOW: 'moneyflow'
};

export default function TrackAccount() {
  const {id} = useParams();
	const {accounts} = useAccountsContext();
	const [selectedSection, setSelectedSection] = useState(STATES.OVERVIEW);


	const account = accounts.find(acnt => acnt.id ===id);

	if(!account){
		return (
			<div>
				invalid account
			</div>
		)
	}

  return (
    <div className="h-[100vh]">
			<Card
        className="h-24 mt-5 py-auto px-3 w-full"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="flex gap-x-4">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={account.img} />
              </Avatar.Group>
							<div className="avatar-info my-auto">
								<h4 className="font-semibold m-0">{account.name}</h4>
								<p>{`Account: ${account.id}`}</p>
							</div>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group value={selectedSection} onChange={(e)=>{setSelectedSection(e.target.value)}}>
                <Radio.Button value="overview">Overview</Radio.Button>
                <Radio.Button value="moneyflow">Money Flow</Radio.Button>
              </Radio.Group>
            </Col>

          </Row>
        }
      />

      <div className="h-[70%] w-[95%] mx-auto">
        {selectedSection === STATES.OVERVIEW && <Overview account={account} />}
        {selectedSection === STATES.MONEYFLOW && <MoneyFlow account={account} />}
      </div>
		</div>
  )
}
