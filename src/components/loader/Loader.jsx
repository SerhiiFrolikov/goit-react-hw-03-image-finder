import { Oval } from 'react-loader-spinner';
import { Wrapper, Text } from './Loader.styled';

const Loader = () => {
  return (
    <>
      <Wrapper>
        <Oval
          height={40}
          width={40}
          color="#3f51b5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#3f51b5"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </Wrapper>
      <Text>Loading...</Text>
    </>
  );
};

export default Loader;
