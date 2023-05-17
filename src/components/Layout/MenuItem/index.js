import Button from '~/components/Button';

function MenuItem({ data, onClick }) {
    return (
        <Button iconLeft={data.icon} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
