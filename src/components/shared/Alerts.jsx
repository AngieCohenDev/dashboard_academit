export const Alert = ({ alert, setAlert }) => {
    if (!alert) return null;

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {alert.message}
            <button
                onClick={() => setAlert(null)}
                className="ml-4 bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};
