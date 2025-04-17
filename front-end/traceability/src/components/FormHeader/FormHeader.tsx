import { ORG_PROFILES } from '@utils/AppConstant';
import { AppBodyProps } from '@utils/BaseIntefaces';
import React, { useEffect, useState } from 'react'

interface FormHeaderProps extends AppBodyProps {
  bodyTitle : string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ organization, bodyTitle }) =>{
    const [organizationTitle, setOrganizationTitle] = useState<string>('');
    
      // Update organizationTitle when the organization changes
      useEffect(() => {
        setOrganizationTitle(ORG_PROFILES[organization]?.title || '');
      }, [organization]);
  return (
    <h2>{organizationTitle != '' ? organizationTitle + " - " : ''}{bodyTitle}</h2>
  )
}

export default FormHeader