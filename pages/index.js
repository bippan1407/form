import { List, ListItem } from "@mui/material";
import Link from "next/link";

export default function Home() {
    return <List>
        <ListItem>
            <Link href='/simpleFormHandling'>
                Simple Form Handling
            </Link>
        </ListItem>
        <ListItem>
            <Link href='/dynamicFormHandling'>
                Dynamic Form Handling
            </Link>
        </ListItem>
    </List>
}

