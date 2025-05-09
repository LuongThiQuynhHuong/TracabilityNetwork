import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { registerOrgRoleController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { OrganizationRole, ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const RegisterOrgRoleBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [orgId, setOrgId] = useState('');
  const [role, setRole] = useState<OrganizationRole>(OrganizationRole.RegulatoryDepartment);
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  // Form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const roleData : RequestModel = {
      organization: organization,
      orgKey: orgId,
      role: role,
    };

    console.log('Form data:', roleData);

    try {
      const response = await registerOrgRoleController(roleData);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus);
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot register role");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Register Organization Role" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="orgId">
          <Form.Label>Organization Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter organization id"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value as OrganizationRole)}
            disabled={toastStatus === ToastStatus.Loading}
          >
            <option value={OrganizationRole.RegulatoryDepartment}>Regulatory Department</option>
            <option value={OrganizationRole.Farm}>Farm</option>
            <option value={OrganizationRole.Processor}>Processor</option>
            <option value={OrganizationRole.Distributor}>Distributor</option>
            <option value={OrganizationRole.Retailer}>Retailer</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={toastStatus === ToastStatus.Loading}
        >
          Submit
        </Button>
      </Form>

      {showToast && (
        <CustomToast
          showToast={showToast}
          onCloseToast={() => OnCloseCustomToast(toastStatus, setToastStatus, setShowToast)}
          toastStatus={toastStatus}
          bodyText={toastBodyText}
        />
      )}
    </Container>
  );
};

export default RegisterOrgRoleBody;
