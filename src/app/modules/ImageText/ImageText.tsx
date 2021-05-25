import { IImageFields } from "../../../contentful/@types/contentful";
import Container from "../../components/container";
import { RespImage } from "../../utils/RespImage";
import RichText from "../../elements/rich-text/RichText";
import React from "react";

export const Image = (props: { fields: IImageFields; customText?: Document }) => (
    <Container animateIn>
        <Container background="Primary">
            <Container layout="maxWidth">
                <RespImage image={props.fields.image} />
            </Container>
        </Container>
        {props.fields.textBlock && (
            <Container pad="All" background="Secondary">
                <Container layout="maxWidthNarrow">
                    <RichText
                        document={props.customText || props.fields.textBlock} />
                </Container>
            </Container>
        )}
    </Container>
);