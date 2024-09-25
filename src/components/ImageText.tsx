interface ImageTextProps {
    imageURI: string;
    text: string;
    title?: string;
    leftToRight?: boolean;
}

const ImageText: React.FC<ImageTextProps> = ({
    imageURI,
    text,
    title,
    leftToRight = true,
}) => {
    return (
        <div className={`flex ${leftToRight ? 'flex-row' : 'flex-row-reverse'} mb-8`}>
            <img src={imageURI} alt="image" className="w-1/2 h-64 object-cover" />
            <div className="w-1/2 p-4">
                {title && <h2 className="text-xl font-bold">{title}</h2>}
                <p>{text}</p>
            </div>
        </div>
    );
};

export default ImageText;