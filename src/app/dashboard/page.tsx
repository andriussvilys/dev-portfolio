import { PageName } from "@/src/components/dashboard/constants";
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage";

export default function Dashboard() {
    return (
        <DashboardPage name={PageName.DASHBOARD}>
            {null}
        </DashboardPage>
    )
}