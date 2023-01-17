import TinyMCEForm from "./TinyMCEForm";

const FormikControl = (props: any) => {
    const { control, ...rest } = props;

    switch (control) {
        case "tiny-mce":
            return <TinyMCEForm {...rest} />;
        default:
            return null;
    }
};

export default FormikControl;