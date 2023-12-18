import { Accordion, Form, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from "react";
import { SettingsContext } from "./App";

export default function Settingsbar(props) {

    const { editor, setEditor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun, autoCloseTags,setAutoCloseTags  } = useContext(SettingsContext);

    const themeMapping={
        "material":"Material Theme",
        "cobalt":"Cobalt theme",
        "xq-dark":"XQ-dark",
        "the-matrix":"Matrix",
        "night":"Night",
        "3024-day":"Light"
    }

    return (
        <Accordion activeKey={props.isSettingsOpen ? "0" : null} data-bs-theme="dark" variant="dark" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Body >
                    <Form className="d-md-flex justify-content-md-between align-items-center">
                        {editor=="webeditor" && <>
                        <div className="p-1">
                            <Form.Check type="switch" label="Run manually" defaultChecked={!autorun} onChange={() => setAutorun(!autorun)} />
                        </div>
                        <div className="p-1">
                            <Form.Check type="switch" label="Show as Tabs" defaultChecked={tabornot} onChange={() => setTabornot(!tabornot)} />
                        </div>
                        <div className="p-1">
                            <Form.Check type="switch" label="Autoclose tags" defaultChecked={autoCloseTags} onChange={() => setAutoCloseTags(!autoCloseTags)} />
                        </div>
                        </>
                        }
                        <div className="p-1">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Theme: {themeMapping[theme]}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setTheme("material")}>Material Theme</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("cobalt")}>Cobalt theme</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("xq-dark")}>XQ-dark</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("the-matrix")}>Matrix</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("night")}>Night</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setTheme("3024-day")}>Light</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
