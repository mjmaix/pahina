import Icon from 'react-icons-kit';
import { chevronsDown } from 'react-icons-kit/feather/chevronsDown';
import { IconSize } from '../../themes/constants';
import { Spinner, ListGroupItem } from 'reactstrap';

interface Props {
  loading: boolean;
  loadMore: () => any;
}

const FetchMoreComponent = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Icon size={IconSize.MD} icon={chevronsDown} />
  );
};

export const FetchMoreItem = ({ loadMore, loading }: Props) => {
  return (
    <ListGroupItem
      className="text-center"
      onMouseEnter={loadMore}
      onClick={loadMore}
    >
      {<FetchMoreComponent loading={loading} />}
    </ListGroupItem>
  );
};
