

const LandingPage = () => {
    
    return (
        <div className="flex flex-row gap-10">
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Projects</h2>
                    <p>You have 5 projects on going</p>
                </div>
            </div>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Scrum master</h2>
                    <p>You have 1 projects on going</p>
                </div>
            </div>
        </div>
    )
}

export default LandingPage