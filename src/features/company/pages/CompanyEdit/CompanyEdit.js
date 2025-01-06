import { useLocation } from 'react-router-dom';
import CompanyForm from '../../components/CompanyForm';

const CompanyEdit = () => {
  const location = useLocation();
  const { companyDetail } = location.state || {};
  console.log('TEST', location.state);
  return <CompanyForm id={companyDetail?.id} company={companyDetail} />;
};

export default CompanyEdit;
