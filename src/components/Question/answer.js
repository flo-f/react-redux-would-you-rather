import React from 'react';
import { Badge, Col, Icon, Row, Progress } from 'antd';

import './answer.css';

const OptionDetail = ({ option, chosen, totalVotes }) => (
  <Row className={ `option-detail ${chosen ? 'chosen' : ''}` }>
    <Col span={8} className="numbers">
      <Progress
        type="circle"
        percent={ Math.round(100 * option.votes.length / totalVotes) }
        width={40}
        format={ percent => `${ percent }%` }
      />
      <p className="quota">
        { option.votes.length } votes
      </p>
    </Col>
    <Col span={14} offset={2}>
      <p className="text">
        { chosen &&
          <Badge dot style={{ backgroundColor: '#52c41a', marginRight: '2em' }}>
            <Icon type="check-circle-o" />
          </Badge>
        }
        { option.text }
      </p>
    </Col>
  </Row>
);

export default OptionDetail;

