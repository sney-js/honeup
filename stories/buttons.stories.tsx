import { storiesOf } from "@storybook/react";
import * as React from "react";
import Button from "../src/app/elements/button/Button";
import Container from "../src/app/components/container/Container";
import Arrow from "../src/app/elements/button/Arrow";
import LinkElement from "../src/app/elements/link/LinkElement";
import SvgAccount from "../src/app/elements/svg-elements/Arrow";

storiesOf("Button", module).add("default button", () => (
    <React.Fragment>
        <Container pad={"Horizontal"}>
            <h2>Default button</h2>
            <Button>Button text</Button>
            <h2>Disabled button</h2>
            <Button disabled={true}>Disabled button</Button>
            <h2>Button with link</h2>
            <Button link={<LinkElement path={"https://google.com"} newTab isExternal />}>
                Button text
            </Button>

            <h2>Icon button</h2>
            <Button shape={"icon-filled"} icon={<SvgAccount />} />
            <Button shape={"icon-filled"} icon={<SvgAccount />} disabled />

            <h2>Arrows</h2>
            <Arrow direction={"left"} disabled={true} />
            <Arrow />
        </Container>
    </React.Fragment>
));
