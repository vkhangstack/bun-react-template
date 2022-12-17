import { FunctionComponent } from "react";
import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
interface PageNotFoundProps {
  
}
 
const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (  
  <>
    <TextArea rows={4} />
    <br />
    <br />
    <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
  </>
  );
}
 
export default PageNotFound;